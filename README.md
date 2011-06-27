Rotator
=======

Rotate between HTML pages with a nice animation. Ideal for a build radiator or
other information screen.

Usage
-----

Append the URLs you wish to show as `url=` parameters after a `#`:

    index.html#url=http://foo.example.com/&url=http://bar.example.com

Other parameters:

    framewait: 20    Time between animation frames (ms)
    showtime:  2000  Time to show each page before rotating (ms)
    speed:     0.6   Speed of rotation (arbitrary units)
    border:    100   Pixels between each page

Limitations
-----------

It's not currently possible to show a URL containing a query string.
