from django.db import models

# Create your models here.
class Sample(models.Model):
    a = models.CharField(max_length=8)
    b = models.CharField(max_length=64)
    c = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)

    '''
    def serialize(self):
        return {
            "a": self.a,
            "b": self.b,
            "c": self.c,
        }
    '''

    


