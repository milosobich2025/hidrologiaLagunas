window.DATOS = {
 "temporadas": [
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026"
 ],
 "casos": [
  {
   "id": "blanca",
   "nombre": "Laguna Blanca",
   "sub": "Toda la cuenca, unas 44.870 ha",
   "comuna": "Comuna de Laguna Blanca",
   "mapa": "imagen",
   "cobertura_parcial": 80,
   "clima": {
    "lluvia": [
     411,
     325,
     409,
     313,
     289,
     327,
     318,
     316,
     399
    ],
    "evaporacion": [
     805,
     843,
     796,
     836,
     871,
     914,
     839,
     824,
     838
    ],
    "viento": [
     31,
     36,
     30,
     37,
     30,
     38,
     33,
     29,
     33
    ]
   },
   "series": [
    {
     "id": "sedimento",
     "titulo": "Sedimento expuesto",
     "unidad": "ha",
     "color": "sedimento",
     "valores": [
      10406,
      12349,
      12404,
      13952,
      14536,
      16351,
      14335,
      12588,
      12592
     ],
     "nota": "Superficie de fondo de laguna seco y sin vegetación."
    },
    {
     "id": "agua",
     "titulo": "Agua superficial",
     "unidad": "ha",
     "color": "agua",
     "valores": [
      307,
      1078,
      1962,
      426,
      411,
      192,
      552,
      594,
      389
     ],
     "nota": "Superficie cubierta por agua en verano."
    },
    {
     "id": "vega",
     "titulo": "Vegas y vegetación densa",
     "unidad": "ha",
     "color": "vegetacion",
     "valores": [
      8091,
      6932,
      14034,
      6245,
      4725,
      1927,
      13266,
      5911,
      8443
     ],
     "nota": "Superficie con vegetación muy verde (NDVI mayor a 0,5)."
    }
   ]
  },
  {
   "id": "plantines",
   "nombre": "Zona de plantación de Salicornia",
   "sub": "Sector noreste de Laguna Blanca, unas 148 ha",
   "comuna": "Comuna de Laguna Blanca",
   "mapa": "satelite",
   "bounds": {
    "suelo": [
     [
      -52.34034590127334,
      -71.12490827444277
     ],
     [
      -52.3290342076449,
      -71.10639631469684
     ]
    ],
    "vegetacion": [
     [
      -52.34034865566372,
      -71.12476159560133
     ],
     [
      -52.32903684547472,
      -71.10654328764834
     ]
    ]
   },
   "marcador": [
    -52.33479761655822,
    -71.11578129847453
   ],
   "cobertura_parcial": 42,
   "clima": {
    "lluvia": [
     404,
     320,
     400,
     310,
     287,
     321,
     318,
     312,
     397
    ],
    "evaporacion": [
     871,
     912,
     865,
     903,
     940,
     989,
     903,
     891,
     906
    ],
    "viento": [
     30,
     33,
     30,
     37,
     30,
     37,
     33,
     29,
     34
    ]
   },
   "series": [
    {
     "id": "ndvi",
     "titulo": "Verdor de la vegetación",
     "unidad": "NDVI",
     "color": "vegetacion",
     "valores": [
      0.476,
      0.421,
      0.486,
      0.458,
      0.392,
      0.065,
      0.068,
      0.209,
      0.377
     ],
     "nota": "Valor mediano del NDVI en el sector: más alto, más verde."
    },
    {
     "id": "agua",
     "titulo": "Agua superficial",
     "unidad": "ha",
     "color": "agua",
     "valores": [
      2.1,
      1.1,
      1.1,
      0.9,
      1.0,
      1.2,
      9.6,
      7.1,
      4.5
     ],
     "nota": "Superficie cubierta por agua en verano."
    },
    {
     "id": "suelo",
     "titulo": "Suelo desnudo",
     "unidad": "% del área",
     "color": "sedimento",
     "valores": [
      1.0,
      5.0,
      0.0,
      4.0,
      14.0,
      36.0,
      12.0,
      0.0,
      0.0
     ],
     "nota": "Porcentaje del sector con suelo descubierto (BSI mayor a 0,1)."
    }
   ]
  },
  {
   "id": "lospalos",
   "nombre": "Laguna Los Palos",
   "sub": "Laguna y entorno, unas 1.370 ha",
   "comuna": "Unos 58 km al norte de Punta Arenas",
   "mapa": "satelite",
   "bounds": {
    "suelo": [
     [
      -52.75636192285091,
      -71.10000977029831
     ],
     [
      -52.71093674239641,
      -71.02528795134437
     ]
    ],
    "vegetacion": [
     [
      -52.756274880084774,
      -71.09985737660848
     ],
     [
      -52.71093936051587,
      -71.0255802185182
     ]
    ]
   },
   "cobertura_parcial": 90,
   "clima": {
    "lluvia": [
     371,
     304,
     415,
     299,
     279,
     325,
     301,
     316,
     383
    ],
    "evaporacion": [
     920,
     963,
     886,
     944,
     997,
     1041,
     964,
     935,
     954
    ],
    "viento": [
     38,
     47,
     36,
     46,
     39,
     51,
     38,
     37,
     46
    ]
   },
   "series": [
    {
     "id": "agua",
     "titulo": "Agua superficial",
     "unidad": "ha",
     "color": "agua",
     "valores": [
      290.6,
      383.7,
      373.4,
      347.4,
      299.5,
      233.0,
      73.7,
      166.2,
      120.6
     ],
     "nota": "Superficie cubierta por agua en verano."
    },
    {
     "id": "reveg",
     "titulo": "Fondo de laguna con vegetación",
     "unidad": "ha",
     "color": "vegetacion",
     "valores": [
      1.0,
      0.6,
      2.1,
      5.8,
      8.0,
      26.8,
      103.5,
      111.0,
      137.1
     ],
     "nota": "Parte del antiguo fondo de la laguna que hoy tiene plantas (NDVI mayor a 0,3)."
    },
    {
     "id": "ndvi",
     "titulo": "Verdor del entorno",
     "unidad": "NDVI",
     "color": "vegetacion",
     "valores": [
      0.527,
      0.524,
      0.624,
      0.505,
      0.488,
      0.415,
      0.613,
      0.535,
      0.584
     ],
     "nota": "Valor mediano del NDVI alrededor de la laguna."
    }
   ]
  },
  {
   "id": "ana",
   "nombre": "Laguna Ana",
   "sub": "Parque Nacional Pali Aike, unas 591 ha",
   "comuna": "Comuna de San Gregorio",
   "mapa": "satelite",
   "bounds": {
    "suelo": [
     [
      -52.07955379390317,
      -69.81104664263897
     ],
     [
      -52.05764701794151,
      -69.77190420792228
     ]
    ],
    "vegetacion": [
     [
      -52.07937413774487,
      -69.81104501322294
     ],
     [
      -52.05764701794151,
      -69.77190282376309
     ]
    ]
   },
   "cobertura_parcial": 23,
   "clima": {
    "lluvia": [
     222,
     209,
     318,
     174,
     189,
     150,
     218,
     175,
     239
    ],
    "evaporacion": [
     1003,
     1038,
     936,
     1055,
     1064,
     1149,
     1038,
     1053,
     1061
    ],
    "viento": [
     38,
     49,
     36,
     47,
     38,
     46,
     40,
     42,
     48
    ]
   },
   "series": [
    {
     "id": "agua",
     "titulo": "Agua superficial",
     "unidad": "ha",
     "color": "agua",
     "valores": [
      23.9,
      70.3,
      105.9,
      79.5,
      52.4,
      37.4,
      46.0,
      32.9,
      8.8
     ],
     "nota": "Superficie cubierta por agua en verano."
    },
    {
     "id": "lecho",
     "titulo": "Fondo de laguna seco",
     "unidad": "ha",
     "color": "sedimento",
     "valores": [
      9.9,
      62.4,
      26.8,
      53.2,
      80.2,
      95.2,
      86.7,
      99.8,
      123.9
     ],
     "nota": "Parte de la laguna que quedó sin agua y con sedimento a la vista."
    },
    {
     "id": "ndvi",
     "titulo": "Verdor de la estepa",
     "unidad": "NDVI",
     "color": "vegetacion",
     "valores": [
      0.345,
      0.346,
      0.42,
      0.337,
      0.286,
      0.248,
      0.356,
      0.283,
      0.279
     ],
     "nota": "Valor mediano del NDVI en la estepa que rodea la laguna."
    }
   ]
  }
 ]
};
