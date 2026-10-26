split_clients $request_id $api_upstream { 50% http://api-green:5000; * http://api-blue:5000; }
