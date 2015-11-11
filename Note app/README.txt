Hi!

Here is the link: http://mishi.city/zenefits/index.html
It is designed for mobile devices.

1) How to use?
Click the button New on top right to creat new note;
Click on the left part of any existing notes to modify it;
Left/right swipe supported. By swiping left on a item(one of the existing notes), you can delete it.

2)Technologies?
zepto.js(mini version);
responsive;
persistent data store;

3)Why?
	3.1, It is designed to run on mobile devices, so I did not include many external libraries. To make it lighter, I used zepto.js instead of mobile jQuery. 
	3.2, To achieve a better/smooth user experience, I used touchstart/touchmove/touchend instead of click events to avoid the so called 300ms click delay. Click event might also cause flash effects on mobile devices which is so bad for experience. I also remove zoom in/out to speed up the response time when use click on something.
	3.3, It is simple & clean, everything you can see is useful. No explicit delete buttons! Nowdays users tend to delete items on mobile devices by swiping left/right. Just like the way people use Notes on iPhones; 
	3.4, Localstorage used, just as required. So users could still see their notes the next time they visit the URL;
	3.5, LRU(Least recently used) is implemented. This is used to keep the lateset modified/created item on top of the list. The order is also kept persistently. The next time users visit this url, the item orders stay same.

The reason why I did it this way is just to stimulate the native user experience, like the way we use notes apps on IOS or Android devices.

