import uuid

def get_save_path(instance, filename):
    return uuid.uuid4().hex + "_" + filename
