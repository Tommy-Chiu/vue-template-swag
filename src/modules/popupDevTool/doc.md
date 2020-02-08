# Markdown Demo

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal rules

___

---

***

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
>>> ...or with spaces between arrows.

## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
return bar++;
};

console.log(foo(5));
```

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

## Plugins

### Subscript / Superscript

- 29^th^
- H~2~O

[Documentation for Subscript](https://github.com/markdown-it/markdown-it-sub)
[Documentation for Superscript](https://github.com/markdown-it/markdown-it-sup)

### Footnote

Here is a footnote reference,[^1] and another.[^longnote]
Subsequent paragraphs are indented to show that they
belong to the previous footnote.
[^1]: Here is the footnote.
[^longnote]: Here's one with multiple blocks.

[Documentation for Footnote](https://github.com/markdown-it/markdown-it-footnote)

### Definition lists

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b

[Documentation for Definition lists](https://github.com/markdown-it/markdown-it-deflist)

### Abbreviation

The HTML specification
is maintained by the W3C.
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

[Documentation for Abbreviation](https://github.com/markdown-it/markdown-it-abbr)

### Emoji

:panda_face: :sparkles: :camel: :boom: :pig:

[Documentation for Emoji](https://github.com/markdown-it/markdown-it-emoji)

### Insert

++inserted++

[Documentation for Insert](https://github.com/markdown-it/markdown-it-ins)

### Mark

==marked==

[Documentation for Mark](https://github.com/markdown-it/markdown-it-mark)

### Task lists

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley

[Documentation for Task lists](https://github.com/revin/markdown-it-task-lists)

## Custom container

### Notice

:::plugin info
```
You have new mail.
```
:::

:::plugin warning
```
You have new mail.
```
:::

:::plugin success
```
You have got it.
```
:::

:::plugin error
```
Staying up all night is bad for health.
```
:::

Markup is similar to fenced code blocks. Valid container types are `info`, `warning`, `success` and `error`.

### Echarts

:::plugin echarts
```
{
  "width": 500,
  "height": 400,
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "radius": "55%",
      "data": [
        {
          "value": 235,
          "name": "视频广告"
        },
        {
          "value": 274,
          "name": "联盟广告"
        },
        {
          "value": 310,
          "name": "邮件营销"
        },
        {
          "value": 335,
          "name": "直接访问"
        },
        {
          "value": 400,
          "name": "搜索引擎"
        }
      ]
    }
  ]
}
```
:::

The width and height is the size for chart container.

[Documentation for echarts](http://echarts.baidu.com)

### Mermaid

:::plugin mermaid
```
graph TB
a-->b
```
:::

[Documentation for mermaid](https://mermaid-js.github.io/mermaid/#/)

### Flowchart

:::plugin flowchart
```
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|request
para=>parallel: parallel tasks

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->para
c2(true)->io->e
c2(false)->e

para(path1, bottom)->sub1(left)->op1
para(path2, right)->op2->e

st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})
```
:::

[Documentation for flowchart](http://flowchart.js.org/)

### Demo

::: demo :::
description
```
<style scoped>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template lang="pug">
  div.wrap {{content}}
</template>

<script>
  export default {
    data () {
      return {
        content: 'view'
      }
    }
  }
</script>
```
::: demo :::
