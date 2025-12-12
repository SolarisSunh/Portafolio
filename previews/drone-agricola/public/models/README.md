Coloca aquí tus archivos `.stl` para que se incluyan en el build.

- Edita también `models.json` en esta misma carpeta para listar los modelos que quieras que aparezcan en el selector de “Cargar ejemplo”.
- Por defecto, el selector busca `example.stl`. Puedes reemplazarlo por tu archivo y actualizar la propiedad `"file"`.

Ejemplo de entrada en `models.json`:

```json
{
  "models": [
    { "label": "Mi Dron V1", "file": "mi-dron-v1.stl" }
  ]
}
```



