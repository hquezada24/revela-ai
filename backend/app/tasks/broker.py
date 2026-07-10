from dramatiq.brokers.redis import RedisBroker
import dramatiq
import os

broker = RedisBroker(url=os.getenv("REDIS_URL"))

dramatiq.set_broker(broker)