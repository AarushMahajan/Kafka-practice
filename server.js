var express = require('express');
var payload = require('./fakeData');
var { Kafka } = require('kafkajs');

var app = express();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
})

const producer = kafka.producer()

app.get('/', async (req, res, next) => {

    await producer.connect()

    let deyaly = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, 3000)
        })
    }

    // FOR BATCH PROCESSING
    let i = 0;
    // let arr = [];
    // while (i < 11) {
    //     arr.push(payload.getPayload());
    //     if(arr.length % 5 === 0) {
    //         await producer.send({
    //             topic: 'test',
    //             messages: arr.map(c => ({ value: JSON.stringify(c) })),
    //         })
    //         arr = [];
    //         await deyaly();
    //     }
    //     i++;
    // }
    while (i < 50) {
        const data = JSON.stringify(payload.getPayload());
        await producer.send({
            topic: 'test-replication',
            messages: [
                { value: "" + i } // send data to particular partation  { value: data, partition: 0 }
            ],
        })
        i++;
        await deyaly();
    }


    res.send("Payload send successfully !!!!");
})

app.listen('3000', () => {
    console.log('Server started on port 3000!!!');
})