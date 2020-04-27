1. Prereqs:
   - protobuf
   - go get github.com/twitchtv/twirp/protoc-gen-twirp_python
   - npm install protobufjs

1. Run `extract_protos.js` in inspector on invoice page
1. Then copy the new div to `./squareup.json`
1. ```sh
   node ./node_modules/protobufjs/cli/bin/pbjs -t proto2 squareup.json > squareup.proto
   ```
1. Move the `service` definitions in squareup.proto to the bottom of the file; these aren't allowed inside messages
1. Add `option allow_alias = true;` inside the CatalogObjectType enum above DO_NOT_USE.
1. ```sh
   protoc --plugin=`which protoc-gen-twirp_python` --python_out=. --twirp_python_out=. -I. squareup.proto
   ```
1. Modify `__service_name` in `squareup_pb2_twirp.py` to include the full package names.
1. Change `/twirp` to `/services`
1. Change the `headers=` dict in `_make_request` to
   - `Content-type: application/x-protobuf`
   - `Accept: application/x-protobuf`

1. Now from python you can:
   ```py
   req = _sym_db.GetSymbol("squareup.invoice.frontend.GetInvoiceRequest")()
   req.invoice_token = 'EzNe6oF5dAHLt9FsRAjbQg'
   client = InvoiceFrontendServiceClient('https://squareup.com')
   res =  client.get_invoice(req)
   print(res)
   ```
