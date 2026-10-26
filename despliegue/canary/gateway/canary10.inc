split_clients $request_id $api_upstream { 10% http://api-green:5000; * http://api-blue:5000; }
