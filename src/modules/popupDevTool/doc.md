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
