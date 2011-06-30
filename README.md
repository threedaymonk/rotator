Rotator
=======

Rotate between HTML pages with a nice animation. Ideal for a build radiator or
other information screen.

Requires WebKit.

Usage
-----

Append the URLs you wish to show as `url=` parameters after a `#`:

    index.html#url=http://foo.example.com/&url=http://bar.example.com

If a URL contains a query string, the characters `?`, `&` and `=` must be escaped:

    ? %3F
    & %26
    = %3D

Other parameters (with defaults):

    interval:  5     Time between frames (s)
    speed:     2     Time taken to transition (s)
    border:    100   Pixels between each page
