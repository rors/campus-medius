# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding field 'Video.vimeo_id'
        db.add_column(u'events_video', 'vimeo_id', self.gf('django.db.models.fields.CharField')(default='', unique=True, max_length=100), keep_default=False)


    def backwards(self, orm):
        
        # Deleting field 'Video.vimeo_id'
        db.delete_column(u'events_video', 'vimeo_id')


    models = {
        u'events.document': {
            'Meta': {'object_name': 'Document', '_ormbases': [u'events.MediaObject']},
            'document': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            u'mediaobject_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['events.MediaObject']", 'unique': 'True', 'primary_key': 'True'})
        },
        u'events.event': {
            'Meta': {'object_name': 'Event'},
            'actor_network_image': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('tinymce.models.HTMLField', [], {}),
            'end_time': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'icon': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.contrib.gis.db.models.fields.PointField', [], {'null': 'True'}),
            'media_objects': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['events.MediaObject']", 'symmetrical': 'False', 'through': u"orm['events.EventMediaObject']", 'blank': 'True'}),
            'mediality_mode': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'political_affiliation': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'db_index': 'True'}),
            'start_time': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '1000'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'events.eventmediaobject': {
            'Meta': {'ordering': "['order']", 'object_name': 'EventMediaObject'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['events.Event']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mediaobject': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['events.MediaObject']"}),
            'order': ('django.db.models.fields.IntegerField', [], {}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'db_index': 'True'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'events.image': {
            'Meta': {'object_name': 'Image', '_ormbases': [u'events.MediaObject']},
            'image': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            u'mediaobject_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['events.MediaObject']", 'unique': 'True', 'primary_key': 'True'})
        },
        u'events.mediaobject': {
            'Meta': {'object_name': 'MediaObject'},
            'caption': ('tinymce.models.HTMLField', [], {}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'db_index': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '1000'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'events.sound': {
            'Meta': {'object_name': 'Sound', '_ormbases': [u'events.MediaObject']},
            u'mediaobject_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['events.MediaObject']", 'unique': 'True', 'primary_key': 'True'}),
            'sound': ('django.db.models.fields.files.FileField', [], {'max_length': '100'})
        },
        u'events.video': {
            'Meta': {'object_name': 'Video', '_ormbases': [u'events.MediaObject']},
            u'mediaobject_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['events.MediaObject']", 'unique': 'True', 'primary_key': 'True'}),
            'video': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'vimeo_id': ('django.db.models.fields.CharField', [], {'default': "''", 'unique': 'True', 'max_length': '100'})
        }
    }

    complete_apps = ['events']
