const{ normalizerURL } = require('./crawl.js')
const{ test,expect } = require('@jest/globals')
test ('normalizerURL',()=>{
     const input = 'https://blog.boot.dev/path'
     const actual = normalizerURL(input)
     const expected = 'blog.boot.dev/path'
     expect(actual).toEqual(expected);
})

test ('normalizerURL stript trailling slash',()=>{
     const input = 'https://blog.boot.dev/path/'
     const actual = normalizerURL(input)
     const expected = 'blog.boot.dev/path'
     expect(actual).toEqual(expected);
})

test ('normalizerURL capital',()=>{
     const input = 'http://BLOG.boot.dev/path/'
     const actual = normalizerURL(input)
     const expected = 'blog.boot.dev/path'
     expect(actual).toEqual(expected);
})

test ('normalizerURL strip HTTP',()=>{
     const input = 'http://blog.boot.dev/path/'
     const actual = normalizerURL(input)
     const expected = 'blog.boot.dev/path'
     expect(actual).toEqual(expected);
})