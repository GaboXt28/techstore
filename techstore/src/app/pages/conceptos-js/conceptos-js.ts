import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

// ─── Clase de ejemplo para demostrar POO en JS/TS ─────────────────────────────
class ProductoDemo {
  nombre: string;
  precio: number;
  categoria: string;
  static contadorInstancias = 0;

  constructor(nombre: string, precio: number, categoria: string) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    ProductoDemo.contadorInstancias++;
  }

  formatPrecio(): string {
    return `S/ ${this.precio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  }

  aplicarDescuento(pct: number): number {
    return Math.round(this.precio * (1 - pct / 100));
  }

  toJSON(): object {
    return { nombre: this.nombre, precio: this.precio, categoria: this.categoria };
  }
}

// ─── Interfaz TypeScript ───────────────────────────────────────────────────────
interface ItemDemo {
  etiqueta: string;
  valor: any;
  descripcion?: string;
}

@Component({
  selector: 'app-conceptos-js',
  standalone: false,
  templateUrl: './conceptos-js.html',
  styleUrl: './conceptos-js.css',
})
export class ConceptosJs implements OnInit {

  // ── 1. VARIABLES Y TIPOS DE DATOS ────────────────────────────────────────────
  tiposBasicos: ItemDemo[] = [
    { etiqueta: 'string',    valor: 'TechStore',         descripcion: 'Cadena de texto' },
    { etiqueta: 'number',    valor: 3.14,                descripcion: 'Número (IEEE 754 double)' },
    { etiqueta: 'boolean',   valor: true,                descripcion: 'Verdadero / Falso' },
    { etiqueta: 'null',      valor: null,                descripcion: 'Ausencia intencional de valor' },
    { etiqueta: 'undefined', valor: undefined,           descripcion: 'Variable no inicializada' },
    { etiqueta: 'bigint',    valor: '9007199254740993n', descripcion: 'Entero mayor a MAX_SAFE_INTEGER' },
    { etiqueta: 'symbol',    valor: 'Symbol("id")',      descripcion: 'Identificador único e inmutable' },
    { etiqueta: 'object',    valor: '{ clave: valor }',  descripcion: 'Colección de propiedades' },
  ];

  varLet = 'Declarada con let: reasignable, scope de bloque';
  varConst = 'Declarada con const: referencia inmutable, scope de bloque';
  varVar = 'Declarada con var: reasignable, scope de función (legacy)';

  // ── 2. IEEE 754 Y BigInt ──────────────────────────────────────────────────────
  ieee754Suma    = 0.1 + 0.2;
  ieee754Fix     = (0.1 + 0.2).toFixed(2);
  ieee754Max     = Number.MAX_SAFE_INTEGER;
  ieee754Min     = Number.MIN_SAFE_INTEGER;
  ieee754IsNaN   = isNaN(0 / 0);
  ieee754Inf     = 1 / 0;
  bigIntDemo     = '9007199254740993n (BigInt: preciso más allá de MAX_SAFE_INTEGER)';

  // ── 3. OPERADORES ARITMÉTICOS ─────────────────────────────────────────────────
  opAritmeticos: ItemDemo[] = [
    { etiqueta: '15 + 8',    valor: 15 + 8   },
    { etiqueta: '15 - 8',    valor: 15 - 8   },
    { etiqueta: '15 * 8',    valor: 15 * 8   },
    { etiqueta: '15 / 4',    valor: 15 / 4   },
    { etiqueta: '15 % 4',    valor: 15 % 4   },
    { etiqueta: '2 ** 10',   valor: 2 ** 10  },
    { etiqueta: '++5',       valor: (() => { let n = 5; return ++n; })() },
    { etiqueta: '5--',       valor: (() => { let n = 5; return n--; })() },
  ];

  opLogicos: ItemDemo[] = [
    { etiqueta: 'true && false', valor: true && false  },
    { etiqueta: 'true || false', valor: true || false  },
    { etiqueta: '!true',         valor: !true          },
    { etiqueta: '5 == "5"',      valor: (5 as any) == '5'       },
    { etiqueta: '5 === "5"',     valor: (5 as any) === '5'      },
    { etiqueta: '5 != "5"',      valor: (5 as any) != '5'       },
    { etiqueta: '5 !== "5"',     valor: (5 as any) !== '5'      },
    { etiqueta: 'null ?? "def"', valor: (() => { const v: any = null; return v ?? 'def'; })()  },
    { etiqueta: '10>5 ? "A":"B"',valor: 10 > 5 ? 'A' : 'B' },
  ];

  // Operadores de bits
  opBits: ItemDemo[] = [
    { etiqueta: '12 & 10  (1100 & 1010)', valor: 12 & 10,  descripcion: 'AND bit a bit = 1000 = 8'  },
    { etiqueta: '12 | 10  (1100 | 1010)', valor: 12 | 10,  descripcion: 'OR  bit a bit = 1110 = 14' },
    { etiqueta: '12 ^ 10  (1100 ^ 1010)', valor: 12 ^ 10,  descripcion: 'XOR bit a bit = 0110 = 6'  },
    { etiqueta: '~5',                      valor: ~5,       descripcion: 'NOT bit a bit = -(5+1) = -6'},
    { etiqueta: '1 << 4',                  valor: 1 << 4,   descripcion: 'Desplazamiento izq = 16'   },
    { etiqueta: '64 >> 3',                 valor: 64 >> 3,  descripcion: 'Desplazamiento der = 8'    },
    { etiqueta: '-1 >>> 0',                valor: -1 >>> 0, descripcion: 'Desplaz. sin signo'        },
  ];

  // Asignación compuesta
  asignCompuesta: ItemDemo[] = [];

  // ── 4. MATH ───────────────────────────────────────────────────────────────────
  mathOps: ItemDemo[] = [
    { etiqueta: 'Math.PI',          valor: Math.PI          },
    { etiqueta: 'Math.E',           valor: Math.E           },
    { etiqueta: 'Math.abs(-42)',     valor: Math.abs(-42)    },
    { etiqueta: 'Math.ceil(4.1)',    valor: Math.ceil(4.1)   },
    { etiqueta: 'Math.floor(4.9)',   valor: Math.floor(4.9)  },
    { etiqueta: 'Math.round(4.5)',   valor: Math.round(4.5)  },
    { etiqueta: 'Math.trunc(-4.9)', valor: Math.trunc(-4.9) },
    { etiqueta: 'Math.max(3,1,9,2)', valor: Math.max(3,1,9,2)},
    { etiqueta: 'Math.min(3,1,9,2)', valor: Math.min(3,1,9,2)},
    { etiqueta: 'Math.sqrt(144)',    valor: Math.sqrt(144)   },
    { etiqueta: 'Math.pow(2,8)',     valor: Math.pow(2, 8)   },
    { etiqueta: 'Math.log2(1024)',   valor: Math.log2(1024)  },
    { etiqueta: 'Math.sign(-7)',     valor: Math.sign(-7)    },
    { etiqueta: 'Math.random()*100', valor: Math.floor(Math.random() * 100) },
  ];

  // ── 5. CADENAS ────────────────────────────────────────────────────────────────
  cadenaBase = 'TechStore Lima';
  strMethods: ItemDemo[] = [
    { etiqueta: '.toUpperCase()',          valor: 'techstore'.toUpperCase()                    },
    { etiqueta: '.toLowerCase()',          valor: 'TECHSTORE'.toLowerCase()                    },
    { etiqueta: '.trim()',                 valor: '  TechStore  '.trim()                       },
    { etiqueta: '.length',                 valor: 'TechStore'.length                           },
    { etiqueta: '.includes("Lima")',       valor: 'TechStore Lima'.includes('Lima')            },
    { etiqueta: '.indexOf("Lima")',        valor: 'TechStore Lima'.indexOf('Lima')             },
    { etiqueta: '.lastIndexOf("a")',       valor: 'banana'.lastIndexOf('a')                   },
    { etiqueta: '.slice(0,9)',             valor: 'TechStore Lima'.slice(0, 9)                 },
    { etiqueta: '.substring(10)',          valor: 'TechStore Lima'.substring(10)               },
    { etiqueta: '.replace("Lima","Perú")', valor: 'TechStore Lima'.replace('Lima', 'Perú')    },
    { etiqueta: '.split(",")',             valor: 'A,B,C'.split(',').join(' / ')              },
    { etiqueta: '.repeat(3)',              valor: 'TS '.repeat(3).trim()                      },
    { etiqueta: '.startsWith("Tech")',     valor: 'TechStore'.startsWith('Tech')              },
    { etiqueta: '.endsWith("Store")',      valor: 'TechStore'.endsWith('Store')               },
    { etiqueta: '.padStart(8,"0")',        valor: '42'.padStart(8, '0')                       },
    { etiqueta: '.charAt(0)',              valor: 'TechStore'.charAt(0)                        },
    { etiqueta: '.charCodeAt(0)',          valor: 'T'.charCodeAt(0)                           },
    { etiqueta: 'String.fromCharCode(84)', valor: String.fromCharCode(84)                    },
    { etiqueta: '.at(-1)',                 valor: 'TechStore'.at(-1)                          },
  ];

  templateLiteralDemo = `Precio: S/ ${4500} | IVA (18%): S/ ${(4500 * 0.18).toFixed(2)}`;
  multilineaDemo = `Laptops\nSmartphones\nMonitores`;

  // Regex
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  regexResultados: ItemDemo[] = [
    { etiqueta: 'email válido test',    valor: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test('admin@techstore.com') },
    { etiqueta: 'email inválido test',  valor: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test('no-email')           },
    { etiqueta: '"TS2024".match(/\\d+/)',valor: ('TS2024'.match(/\d+/) || [])[0]                         },
    { etiqueta: 'replace vocales',      valor: 'TechStore'.replace(/[aeiou]/gi, '*')                    },
    { etiqueta: 'solo letras',          valor: 'Abc-123_xyz'.replace(/[^a-zA-Z]/g, '')                  },
    { etiqueta: 'split palabras',       valor: 'uno dos  tres'.split(/\s+/).join('|')                   },
  ];

  // ── 6. CONTROL DE FLUJO ───────────────────────────────────────────────────────
  ifElseResult    = '';
  switchResult    = '';
  forResult:    number[] = [];
  whileResult:  number[] = [];
  doWhileResult:number[] = [];
  forOfResult:  string[] = [];
  forInResult:  string[] = [];
  tryCatchOk    = '';
  tryCatchError = '';

  // ── 7. FUNCIONES ─────────────────────────────────────────────────────────────
  funcionesDemo: ItemDemo[] = [];

  // ── 8. ARREGLOS ──────────────────────────────────────────────────────────────
  numeros      = [5, 2, 8, 1, 9, 3, 7, 4, 6, 10];
  arrMethods: ItemDemo[] = [];
  matriz: number[][] = [[1,2,3],[4,5,6],[7,8,9]];
  matrizFilas: string[] = [];
  spreadArr    = [...[1,2,3], ...[4,5,6]];
  spreadObj    = { nombre: 'ROG', ...{ precio: 4500 }, stock: 12 };

  // ── 9. CLASES Y OBJETOS ───────────────────────────────────────────────────────
  productoInstancia: any = null;
  productoJson      = '';
  productoDescuento = 0;
  instanciasCreadas = 0;

  // ── 10. COLECCIONES ───────────────────────────────────────────────────────────
  mapaItems:   { clave: string; valor: number }[] = [];
  conjuntoItems: any[] = [];

  // ── 11. EVENTOS Y SALIDAS ────────────────────────────────────────────────────
  contadorEvento = 0;
  inputTexto     = '';
  inputInvertido = '';
  consoleLog     = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Asignación compuesta
    let x = 10;
    const pasos: ItemDemo[] = [{ etiqueta: 'x = 10', valor: x }];
    x += 5;  pasos.push({ etiqueta: 'x += 5',  valor: x });
    x -= 3;  pasos.push({ etiqueta: 'x -= 3',  valor: x });
    x *= 2;  pasos.push({ etiqueta: 'x *= 2',  valor: x });
    x /= 4;  pasos.push({ etiqueta: 'x /= 4',  valor: x });
    x **= 2; pasos.push({ etiqueta: 'x **= 2', valor: x });
    x %= 7;  pasos.push({ etiqueta: 'x %= 7',  valor: x });
    this.asignCompuesta = pasos;

    // Control de flujo — if / else if / else
    const hora = new Date().getHours();
    if (hora < 12) {
      this.ifElseResult = `${hora}h → Buenos días ☀️`;
    } else if (hora < 18) {
      this.ifElseResult = `${hora}h → Buenas tardes 🌤️`;
    } else {
      this.ifElseResult = `${hora}h → Buenas noches 🌙`;
    }

    // switch
    const dia = new Date().getDay();
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    switch (dia) {
      case 0:
      case 6:
        this.switchResult = `${dias[dia]} — fin de semana 🎉`; break;
      case 1:
        this.switchResult = `${dias[dia]} — inicio de semana 💼`; break;
      default:
        this.switchResult = `${dias[dia]} — día laboral 📋`;
    }

    // for
    for (let i = 1; i <= 10; i++) {
      this.forResult.push(i * i);
    }

    // while
    let w = 1;
    while (w <= 100) {
      this.whileResult.push(w);
      w *= 2;
    }

    // do-while
    let d = 0;
    do {
      this.doWhileResult.push(d);
      d += 3;
    } while (d <= 15);

    // for...of
    const categorias = ['Laptops', 'Smartphones', 'Monitores', 'Periféricos'];
    for (const cat of categorias) {
      this.forOfResult.push(cat.toUpperCase());
    }

    // for...in (sobre objeto)
    const config: Record<string, any> = { idioma: 'es', moneda: 'PEN', pais: 'Perú' };
    for (const clave in config) {
      this.forInResult.push(`${clave}: ${config[clave]}`);
    }

    // try-catch
    try {
      const json = '{"nombre": "ASUS ROG", "precio": 4500}';
      const parsed = JSON.parse(json);
      this.tryCatchOk = `JSON parseado OK → ${parsed.nombre} a S/ ${parsed.precio}`;
    } catch (e: any) {
      this.tryCatchOk = `Error: ${e.message}`;
    }

    try {
      JSON.parse('{ json: malo }'); // intencional
    } catch (e: any) {
      this.tryCatchError = `Error capturado → ${e.message}`;
    }

    // Funciones
    function declarada(a: number, b: number): number { return a + b; }
    const expresion = function(a: number, b: number): number { return a - b; };
    const flecha = (a: number, b: number): number => a * b;
    const conDefault = (n: number, exp: number = 2): number => n ** exp;
    const conRest = (...nums: number[]): number => nums.reduce((a, b) => a + b, 0);
    const iife = (() => `IIFE ejecutado: ${new Date().toLocaleTimeString()}`)();
    const closureContador = (() => {
      let c = 0;
      return () => ++c;
    })();

    this.funcionesDemo = [
      { etiqueta: 'Declaración:  suma(10, 5)',         valor: declarada(10, 5)       },
      { etiqueta: 'Expresión:    resta(10, 5)',         valor: expresion(10, 5)       },
      { etiqueta: 'Arrow:        mult(4, 5)',           valor: flecha(4, 5)           },
      { etiqueta: 'Default param: pot(3)',              valor: conDefault(3)          },
      { etiqueta: 'Default param: pot(3, 4)',           valor: conDefault(3, 4)       },
      { etiqueta: 'Rest params:   sumar(1..5)',         valor: conRest(1,2,3,4,5)     },
      { etiqueta: 'IIFE',                               valor: iife                   },
      { etiqueta: 'Closure (3 llamadas)',               valor: `${closureContador()}, ${closureContador()}, ${closureContador()}` },
    ];

    // Arreglos
    this.arrMethods = [
      { etiqueta: '.map(n => n²)',          valor: [1,2,3,4,5].map(n => n**2).join(', ')         },
      { etiqueta: '.filter(n => n % 2===0)',valor: this.numeros.filter(n => n % 2 === 0).join(', ')},
      { etiqueta: '.reduce(suma)',           valor: this.numeros.reduce((a, n) => a + n, 0)       },
      { etiqueta: '.find(n > 7)',            valor: this.numeros.find(n => n > 7)                 },
      { etiqueta: '.findIndex(n > 7)',       valor: this.numeros.findIndex(n => n > 7)            },
      { etiqueta: '.some(n > 9)',            valor: this.numeros.some(n => n > 9)                 },
      { etiqueta: '.every(n > 0)',           valor: this.numeros.every(n => n > 0)                },
      { etiqueta: '.includes(5)',            valor: this.numeros.includes(5)                      },
      { etiqueta: '.slice(2, 5)',            valor: this.numeros.slice(2, 5).join(', ')           },
      { etiqueta: '.sort() asc',             valor: [...this.numeros].sort((a,b)=>a-b).join(', ') },
      { etiqueta: '.reverse()',              valor: [...this.numeros].reverse().join(', ')         },
      { etiqueta: '.flat()',                 valor: [[1,2],[3,4],[5,6]].flat().join(', ')         },
      { etiqueta: '.join(" | ")',            valor: ['Laptop','Monitor','Mouse'].join(' | ')      },
      { etiqueta: 'Array.from({length:5})', valor: Array.from({length:5},(_,i)=>i+1).join(', ') },
      { etiqueta: '.forEach (cuenta)',       valor: (() => { let s=0; [1,2,3].forEach(n=>s+=n); return s; })() },
      { etiqueta: 'Spread [...a,...b]',      valor: this.spreadArr.join(', ')                    },
    ];

    // Matriz 2D
    this.matrizFilas = this.matriz.map((fila, i) =>
      `Fila ${i}: [${fila.join(', ')}] — suma = ${fila.reduce((a,b)=>a+b,0)}`
    );

    // Clases y Objetos
    const laptop = new ProductoDemo('Laptop ROG G15', 4500, 'Laptops');
    const monitor = new ProductoDemo('Monitor Samsung 4K', 1800, 'Monitores');
    this.productoInstancia = {
      nombre:     laptop.nombre,
      precio:     laptop.formatPrecio(),
      categoria:  laptop.categoria,
      descuento:  laptop.aplicarDescuento(20),
    };
    this.productoJson = JSON.stringify(laptop.toJSON(), null, 2);
    this.productoDescuento = laptop.aplicarDescuento(20);
    this.instanciasCreadas = ProductoDemo.contadorInstancias;

    // Map
    const mapa = new Map<string, number>([
      ['Laptops', 4500], ['Smartphones', 5200], ['Monitores', 1800],
      ['Teclados', 950], ['Audio', 1350],
    ]);
    mapa.forEach((v, k) => this.mapaItems.push({ clave: k, valor: v }));

    // Set (deduplicación automática)
    const setDemo = new Set(['rojo','azul','verde','azul','rojo','blanco','verde']);
    this.conjuntoItems = [...setDemo];

    // Salidas de consola (demostración)
    console.log('%c[ConceptosJS] Página inicializada', 'color: #28a745; font-weight: bold');
    console.warn('[ConceptosJS] console.warn: advertencia de ejemplo');
    console.error('[ConceptosJS] console.error: error de ejemplo (solo demo)');
    console.table([
      { tipo: 'let',   reasignable: true,  scopeBloque: true  },
      { tipo: 'const', reasignable: false, scopeBloque: true  },
      { tipo: 'var',   reasignable: true,  scopeBloque: false },
    ]);

    this.consoleLog = '✅ Ver consola (F12) — se ejecutaron console.log, .warn, .error, .table';
  }

  // ── EVENTOS ──────────────────────────────────────────────────────────────────
  incrementar(): void {
    this.contadorEvento++;
    this.cdr.detectChanges();
  }

  decrementar(): void {
    if (this.contadorEvento > 0) this.contadorEvento--;
    this.cdr.detectChanges();
  }

  resetContador(): void {
    this.contadorEvento = 0;
    this.cdr.detectChanges();
  }

  mostrarAlert(): void {
    alert(`TechStore dice: ¡Hola! El contador está en ${this.contadorEvento}`);
  }

  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputTexto = val;
    this.inputInvertido = val.split('').reverse().join('').toUpperCase();
    this.cdr.detectChanges();
  }
}
