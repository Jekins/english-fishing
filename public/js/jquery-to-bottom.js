function $(n) {
    function e(n, e) {
        console.error.apply(console, [n, "$("].concat([].slice.call(e, 0)).concat([")"]))
    }
    if (1 === arguments.length || e("Bad signature used instead $(function|document).", arguments), n === document) return {ready: $};
    "function" == typeof n || e("Bad signature used instead $(function).", arguments), $ready.push(n)
}

$ready = [], jQuery = $;