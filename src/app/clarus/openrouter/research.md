# openrouter models

From what Adon and I briefly looked at on Monday 24 Aug, we decided to use Openrouter as the model provider since they are legitimately the goat

3 models struck our eye:
* GLM 5.2
* Nemotron 3 Ultra/Lightning
* Inkling

I'm also considering LFM 2.6B since I've previously done research on liquid neural networks and I was personally fascinated with the idea, but from my old testing with their foundation model it seemed to be distilled of an old version of GPT-3

## GLM 5.2

Most popular frontier model option, impressive tbh

On Openrouter, the provider shares the following:
* 256K context
* Text only
* 2.69s response time (slower than Nemotron)
* 161 TPS (much more than Nemotron)
* 256K max ouput
* Quantised to 75% (fp4)
* Doesn't support stream cancellation
* Tool use
* No prompt training (good)
* No caching

## Nemotron Ultra

The paper (or screen, actually 🤓) statistics are not for the weak

* 1M context (more than GLM)
* Text only
* 2.15s response time (somewhat faster than GLM)
* 35 TPS (significantly slower)
* 66K max output
* Unknown what the quantisation is
* Supports stream cancellation
* Tool use
* There is prompt training (bad ig)
* No caching

## Inkling

...

* 1.05M context (more than both)
* Text, image, and audio
* 1.00s response time (significantly faster than both)
* 68 TPS (better than Nemotron, but not as impressive as GLM)
* 262K max output
* No stream cancellation
* Tool use
* There is prompt training (bag ig)
* No caching

## LFM

LFM, I'm not really bothered to put the stats but I will just say that it is the faster model of the 3, but that's the only thing it's got for it, much smaller context window and output, and probably worse quality responses, though we don't need the most powerful model... ~~so it could actually be what we need.~~ I forgot about the context window, that's a deal breaker

For our specific purpose:
* Context window: higher is much better
* Model should respond quickly for good UX
* Model should ideally be smart and make good reasoning decisions with respect to RAG
* Should have RAG (hence, tool use, which all considered models have so its daijyoubu)

### Claudes's thoughts (summarised by me):
Claude said that GLM 5.2 would be the best since it's the fastest responder (TPS-wise) with a decent thinking capacity

Tuesday, 25th August

### My new findings 
Inkling small is pretty much a better version of Inkling; same large context window, about double the thru-put and its still fairly smart

So for now, im settling of Inkling small. 

Update: im an idiot. Inkling small is only available as an agentic harness :(

GLM will have to do

Update: GLM is very used...

Update: Nemotron lightning seems quite reliable, but it takes so long to response :SOB: so much for latency; actually I