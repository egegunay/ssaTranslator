I am interested in streaming the subtitles. However this is pointless for now because at the end of the day this will be used purely for 25 min video subtitles anyways. Nothing for your i9 14900KS and 128GB DDR5 6400mhz ram and 990 PRO nvme ssd.

I don't know how to make a library so I will just write my functions and leave making this a library for later. I want something that works right now.

So for now, I just want to use DeepL and get an actual translation out of my lines.

Further down the line, I'd like to add logic that adds newlines (\N) to the lines.

And my last step would be some sorta logic for the stylization (like {\pos(x,y)})
I guess if there is only 1 position/color etc for the entire line, there is no issue. But when there are multiple, if for example source language has a word in red for dramatic effect, I am unsure if I should translate that said word seperate. I want to retain context NO MATTER WHAT.

Context > Style. If we cannot maintain context to add logic for a style element, we won't.