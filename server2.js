var express = require('express');
var payload = require('./fakeData');
var { Kafka } = require('kafkajs');

var app = express();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'test-A' });

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-replication' })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

run();

app.listen('3010', () => {
    console.log('Server started on port 3010!!!');
})