import {
  assert,
  method,
  prop,
  SmartContract,
} from 'scrypt-ts'

export class Helloworld extends SmartContract {
  @prop()
  x : bigint
  @prop()
  y : bigint

  constructor(x : bigint, y : bigint) {
      super(...arguments)
      this.x = x
      this.y = y
  }

  @method()
  public unlock(z : bigint) {
      assert(z === this.x + this.y,'incorrect sum')
  }
}