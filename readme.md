Kafka commands:-


To start zookeeper:-
bin/zookeeper-server-start.sh config/zookeeper.properties


To start Kafka:- 
bin/kafka-server-start.sh config/server.properties


To create new topic:-
bin/kafka-topics.sh --create --topic test --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1


To list all topics:-
bin/kafka-topics.sh --list --bootstrap-server localhost:9092


To produce new messages:-
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test


To consumes messages:-
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning(from start it will consume)


To check lag in topic:-
bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group group1


Resource:-
1.) https://svn.apache.org/repos/asf/kafka/site/082/quickstart.html
2.) https://kafka.js.org/docs/introduction
3.) https://www.youtube.com/watch?v=gn2zLFRQ8rI&list=PLxoOrmZMsAWxXBF8h_TPqYJNsh3x4GyO4



IN SERVER.PROPERTIES FILE --> (Config file for kafka)

we have to set the advertise.listener to the port/ip of the particular machine
advertised.listeners=PLAINTEXT://localhost:9092


CONSUMER GROUP:-

1.) For each consumer we should have the consumer group present. A consumer can servive in the consumer group only
2.) Each consumer can be distributed in different brockers in different machines (fault toulrance).
3.) One consumer is assigned to a particular partation.
4.) In multi partation and 1 consumer system consumer consume the messages in round-robin fasion
    i.e 2P and 1C 
    * 1P -> 1C (1st iteratation)
    * 2p -> 1C (2nd iteratation)
5.) It is recomended to have consumer < no of partations for a particular so that consumers are not sitting idel.    


PRODUCERS:-

1.) PRODUCER produces the messages that are consumed my the consumers.
2.) Producer can send data to a particular partation also.
3.) We can send and consume the data in batch.


TOPICS:-

1.) Topic are the logical entity where messages are publish and consumed from.
2.) We can create multiple topics.
3.) Different topics can have multiple partations.


PARTATION:-

1.) Every topic can have multiple partation.
2.) Data in partation is immutable we cannot delete, update the data.
3.) Data in partation have a TTL time that can be configured.
4.) Partation is like array like structure where index is call offset e.g P0[1,2,3,4,5]
5.) When a server is down we can start consuming the messages from where we have left with help of the offset no.

REPLICATION/REPLICATION FACTOR:-

1.) We can set the replication factor to (int value i.e 2).
2.) Replication factor decides how many replication is made.
3.) We have ISR(in sync replicas) which replicte the current topics partation in different brokers.
    so all the read and write will be going to the leader and ISR will replicate the data. If Broker 1 is down the follower(replicated data one) will become the leader until the primary one is up and running.
4.) It helps in fault taularance, high avalibility.    