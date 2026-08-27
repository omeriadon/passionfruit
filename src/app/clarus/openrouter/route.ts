import OpenAI from 'openai';
// import { rag } from './rag';

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.ADON_OPENROUTER_KEY,
});

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
{ 
  type: "function",
  function: {
    name: "search_passionfruit_docs",
    description: "Search the Passionfruit documentation",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term, for example, 'iPad Mini' or 'Apple Pencil'",
        },
      },
      required: ["query"],
    },
  }
},
]

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = {
    role: "system" as const,
    content: "You are an assistant called Clarus made by the Passionfruit team (Adon and Dylan) who is specialised in helping users navigate the Passionfruit documentation. You are to stay focussed, but don't be blunt and always be kind to the user."
  };

  const messageList = [systemPrompt, ...messages];

  const initialResponse = await client.chat.completions.create({
    model: "minimax/minimax-m3:free",
    messages: messageList,
    tools,
    tool_choice: 'auto',
  });

  const responseMessage = initialResponse.choices[0].message;

  if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
    const toolCall = responseMessage.tool_calls[0];

    if (toolCall.type === 'function' && toolCall.function.name === 'search_passionfruit_docs') {
      const { query } = JSON.parse(toolCall.function.arguments);

      // const ragResults = await rag(query);

      const ragInjectedMessageList = [
        ...messageList,
        responseMessage,
        {
          role: "tool" as const,
          tool_call_id: toolCall.id,
          // content: typeof ragResults === 'string' ? ragResults : JSON.stringify(ragResults),
        }
      ]

      const stream = await client.chat.completions.create({
        model: "minimax/minimax-m3:free",
        messages: ragInjectedMessageList,
        stream: true,
      });

      return streamResponse(stream);
    }
  }

  const stream = await client.chat.completions.create({
    model: "minimax/minimax-m3:free",
    messages: messageList,
    stream: true,
  });

  return streamResponse(stream);
}

function streamResponse(stream: any) {

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream as any) {
          const delta = chunk.choices?.[0]?.delta;

          if (delta?.content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta.content })}\n\n`));
          }

          if (delta?.tool_calls) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tool_calls: delta.tool_calls })}\n\n`));
          }

        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}