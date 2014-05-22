# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'Event'
        db.create_table(u'events_event', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=50, db_index=True)),
            ('title', self.gf('django.db.models.fields.CharField')(unique=True, max_length=1000)),
            ('icon', self.gf('django.db.models.fields.files.ImageField')(max_length=100, null=True, blank=True)),
            ('start_time', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('end_time', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('location', self.gf('django.contrib.gis.db.models.fields.PointField')(null=True)),
            ('political_affiliation', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('mediality_mode', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('description', self.gf('tinymce.models.HTMLField')()),
        ))
        db.send_create_signal(u'events', ['Event'])

        # Adding M2M table for field media_objects on 'Event'
        db.create_table(u'events_event_media_objects', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('event', models.ForeignKey(orm[u'events.event'], null=False)),
            ('mediaobject', models.ForeignKey(orm[u'events.mediaobject'], null=False))
        ))
        db.create_unique(u'events_event_media_objects', ['event_id', 'mediaobject_id'])

        # Adding model 'MediaObject'
        db.create_table(u'events_mediaobject', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=50, db_index=True)),
            ('title', self.gf('django.db.models.fields.CharField')(unique=True, max_length=1000)),
            ('caption', self.gf('tinymce.models.HTMLField')()),
        ))
        db.send_create_signal(u'events', ['MediaObject'])

        # Adding model 'Image'
        db.create_table(u'events_image', (
            (u'mediaobject_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['events.MediaObject'], unique=True, primary_key=True)),
            ('image', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'events', ['Image'])

        # Adding model 'Video'
        db.create_table(u'events_video', (
            (u'mediaobject_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['events.MediaObject'], unique=True, primary_key=True)),
            ('video', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal(u'events', ['Video'])

        # Adding model 'Sound'
        db.create_table(u'events_sound', (
            (u'mediaobject_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['events.MediaObject'], unique=True, primary_key=True)),
            ('sound', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal(u'events', ['Sound'])


    def backwards(self, orm):
        
        # Deleting model 'Event'
        db.delete_table(u'events_event')

        # Removing M2M table for field media_objects on 'Event'
        db.delete_table('events_event_media_objects')

        # Deleting model 'MediaObject'
        db.delete_table(u'events_mediaobject')

        # Deleting model 'Image'
        db.delete_table(u'events_image')

        # Deleting model 'Video'
        db.delete_table(u'events_video')

        # Deleting model 'Sound'
        db.delete_table(u'events_sound')


    models = {
        u'events.event': {
            'Meta': {'object_name': 'Event'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('tinymce.models.HTMLField', [], {}),
            'end_time': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'icon': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.contrib.gis.db.models.fields.PointField', [], {'null': 'True'}),
            'media_objects': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['events.MediaObject']", 'symmetrical': 'False', 'blank': 'True'}),
            'mediality_mode': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'political_affiliation': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'db_index': 'True'}),
            'start_time': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '1000'}),
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
            'video': ('django.db.models.fields.files.FileField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['events']
