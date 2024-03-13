"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var grabaMod = function grabaMod(id, editedRecord) {
  var result, mensaje;
  return regeneratorRuntime.async(function grabaMod$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('http://191.101.235.205:4038/api/cafe/' + id, {
            method: 'PUT',
            body: JSON.stringify(editedRecord),
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 2:
          result = _context.sent;

          if (!result.ok) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(result.json());

        case 6:
          mensaje = _context.sent;
          return _context.abrupt("return", mensaje);

        case 8:
          /* else { */
          console.log("Error - No se actualiz\xF3 el registro ".concat(id));
          console.log("Error API ".concat(result.status, " (").concat(result.statusText, ")"));
          /* } */

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = grabaMod;
exports["default"] = _default;