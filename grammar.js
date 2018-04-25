const decimalDigit = /[0-9]/
const decimals = repeat1(decimalDigit)

const decimalLiteral = seq(decimalDigit, repeat(decimalDigit))

const exponent = seq(
  choice('e', 'E'),
  optional(choice('+', '-')),
  repeat1(decimalLiteral)
)

const floatLiteral = choice(
  seq(decimals, '.', optional(decimals), optional(exponent)),
  seq(decimals, exponent)
)

module.exports = grammar({
  name: 'elm',

  rules: {
    program: $ => seq(repeat($.statement)),

    statement: $ => choice(
      $._literals
    ),

    _literals: $ => choice(
      $.integer_literal,
      $.float_literal
    ),

    integer_literal: $ => token(decimalLiteral),
    float_literal: $ => token(floatLiteral)
	}
})

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)))
}
