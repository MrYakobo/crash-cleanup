# crash-cleanup
Cleans up those pesky files that scatters around Solus when doing a reboot.

## Abstract
Have you ever rebooted Solus, just to find this?
```bash
$ tree -as
.
├── [  474435584]  .4001
├── [ 1028882432]  .700
├── [  446013440]  .716
└── [  532758528]  .818
$ du -sh
2.4G .
```
Random files, just being around to take up precious space. `rm .*` is dangerous, and doing regexes in a shell script can become...cumbersome, dangerous too. But! Look no further, as this script aims at fixing all your problems.

[![asciicast](https://asciinema.org/a/NEZx6x0afylxBc4CqyU8oiRmR.png)](https://asciinema.org/a/NEZx6x0afylxBc4CqyU8oiRmR)

## Usage
`npm i -g crash-cleanup`

```bash
crash-cleanup [flags] [path]
```

## Flags
`-r, --recursive` Recursive traversal

`-f, --force` Don't ask before removal

If path is omitted, search in current directory.