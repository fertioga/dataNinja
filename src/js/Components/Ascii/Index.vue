<template>
    <div class="container" data-bs-theme="dark">
      <h2>ASCII Table</h2>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Decimal</th>
            <th>Character</th>
            <th>Name</th>
            <th>Hexadecimal</th>
            <th>Binary</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(char, index) in asciiChars" :key="char.decimal">
            <tr>
              <td>{{ char.decimal }}</td>
              <td>{{ char.char }}</td>
              <td>{{ char.name }}</td>
              <td>{{ char.hex }}</td>
              <td>{{ char.binary }}</td>
            </tr>
            <tr v-if="char.separator" :key="index + 'separator'">
              <td colspan="5"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        asciiChars: []
      };
    },
    created() {
      this.generateAsciiTable();
    },
    methods: {
      generateAsciiTable() {
        for (let i = 0; i <= 255; i++) {
          let charValue = String.fromCharCode(i);
          let name = '';
          if (i >= 0 && i <= 31) {
            switch (i) {
                case 0:
                    name = 'NULL';
                break;
                case 1:
                    name = 'SOH (Start of Heading)';
                break;
                case 2:
                    name = 'STX (Start of Text)';
                break;
                case 3:
                    name = 'ETX (End of Text)';
                break;
                case 4:
                    name = 'EOT (End of Transmission)';
                break;
                case 5:
                    name = 'ENQ (Enquiry)';
                break;
                case 6:
                    name = 'ACK (Acknowledge)';
                break;
                case 7:
                    name = 'BEL (Bell)';
                break;
                case 8:
                    name = 'BS (Backspace)';
                break;
                case 9:
                    name = 'HT (Horizontal Tab)';
                break;
                case 10:
                    name = 'LF (Line Feed)';
                break;
                case 11:
                    name = 'VT (Vertical Tab)';
                break;
                case 12:
                    name = 'FF (Form Feed)';
                break;
                case 13:
                    name = 'CR (Carriage Return)';
                break;
                case 14:
                    name = 'SO (Shift Out)';
                break;
                case 15:
                    name = 'SI (Shift In)';
                break;
                case 16:
                    name = 'DLE (Data Link Escape)';
                break;
                case 17:
                    name = 'DC1 (Device Control 1)';
                break;
                case 18:
                    name = 'DC2 (Device Control 2)';
                break;
                case 19:
                    name = 'DC3 (Device Control 3)';
                break;
                case 20:
                    name = 'DC4 (Device Control 4)';
                break;
                case 21:
                    name = 'NAK (Negative Acknowledge)';
                break;
                case 22:
                    name = 'SYN (Synchronous Idle)';
                break;
                case 23:
                    name = 'ETB (End of Transmission Block)';
                break;
                case 24:
                    name = 'CAN (Cancel)';
                break;
                case 25:
                    name = 'EM (End of Medium)';
                break;
                case 26:
                    name = 'SUB (Substitute)';
                break;
                case 27:
                    name = 'ESC (Escape)';
                break;
                case 28:
                    name = 'FS (File Separator)';
                break;
                case 29:
                    name = 'GS (Group Separator)';
                break;
                case 30:
                    name = 'RS (Record Separator)';
                break;
                case 31:
                    name = 'US (Unit Separator)';
                break;
                default:
                if (i >= 0 && i <= 31) {
                    name = 'Control Character';
                }
            }
          } else if (i >= 127 && i <= 255) {
            name = 'Extended ASCII';
          }
          this.asciiChars.push({
            decimal: i,
            char: charValue,
            name: name,
            hex: i.toString(16).toUpperCase(),
            binary: i.toString(2).padStart(8, '0'),
            separator: (i === 31 || i === 127)
          });
        }
      }
    }
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .gray-row {
    background-color: #f0f0f0;
  }
  </style>  