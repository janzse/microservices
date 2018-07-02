# Microservices

Microservices kommunizieren mit zwei Raspberry Pis, welche Sensoren für Luftfeuchtigkeit, Helligkeit und Temperatur haben und die Daten übergeben.
Über Events werden die LEDs gesteuert.

## Services
- 2 Temperatur-Services
- Helligkeit-Service
- Luftfeuchttigkeit-Service
- 2 LED-Services
- Alarm-Service

## Ereignisse
- Temperatur > x: Alarm
- Helligkeit < x: LED 2 an
