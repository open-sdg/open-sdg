<h1>Data schema</h1>

It is possible to supply a "data schema" for each indicator, which describes the fields that are allowed, and the values that they can have. Currently, this only use for this is to control the order of the fields and values. In the future it may also be used for data validation.

## Creating a data schema file

To add a data schema for an indicator, you will need to add a file to your data repository. We recommend you place this file in subfolder called "data-schema". Name the file according to the indicator number, with a ".yml" extension.

For example, the path of the file in your data repository could be:

```
data-schema/1-1-1.yml
```

The contents of the file should use YAML syntax, and should follow this pattern:

```
fields:
  - name: Value
    type: number
  - name: Year
    type: integer
  - name: Sex
    type: string
    constraints:
      enum:
        - ""
        - Female
        - Male
  - name: Location
    type: string
    constraints:
      enum:
        - ""
        - Rural
        - Urban
```

## Controlling the order of fields

Using a data scheme allows you to control the order in which the field dropdowns appear. For example, to make "Location" appear above "Sex" in the example above, you could reverse their position in the schema:

```
fields:
  - name: Value
    type: number
  - name: Year
    type: integer
  - name: Location
    type: string
    constraints:
      enum:
        - ""
        - Rural
        - Urban
  - name: Sex
    type: string
    constraints:
      enum:
        - ""
        - Female
        - Male
```

## Controlling the order of field values

By the same token, you could control the order of the checkboxes in the field dropdowns. For example, you could reverse the positions of "Rural" and "Urban", like so:

```
fields:
  - name: Value
    type: number
  - name: Year
    type: integer
  - name: Location
    type: string
    constraints:
      enum:
        - ""
        - Urban
        - Rural
  - name: Sex
    type: string
    constraints:
      enum:
        - ""
        - Female
        - Male
```
