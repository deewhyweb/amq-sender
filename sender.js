/*
 * Copyright 2015 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const port = process.env['port']? process.env['port'] : 5672;
const host = process.env['host']? process.env['host'] : '127.0.0.1';
const msg = process.env['msg']? process.env['msg'] : 'test message';
const username = process.env['username']? process.env['username'] : 'artemis';
const password = process.env['password']? process.env['password'] : 'simetraehcapa';

var container = require('rhea');
container.on('connection_open', function (context) {
    context.connection.open_sender('examples');
});

container.on('sendable', function (context) {
    context.sender.send({msg});
    console.log('Message sent ' + msg)
    context.sender.detach();
    context.connection.close();
});
container.on('error', function (context) {
    console.log('error');
    console.log(context);
});
container.connect({port: port, host: host, username: username, password: password});
