# 5.0.0 (26/06/2021)

Needs to be used alongside [snabbdom `v3`](https://github.com/snabbdom/snabbdom/blob/master/CHANGELOG.md#300-2021-03-28). 

# 2.0.1

- fix compatibilty with Safari (< 10) (#22)
- fix variable shadowingj (#13)

# 2.0.0

Prior to `v2.0.0`, `select` would add a `data.parent` property on vnodes for internal purposes.
This property is not accessible anymore.
