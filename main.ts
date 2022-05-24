// tsc .\main.ts ; node .\main.js

//  ед. измерения
enum unitOfMeasurement {
  Kelvins = 'Kelvins',
  Celsius = 'Celsius',
  Fahrenheit = 'Fahrenheit'
}

type Temperature = {
  unitOfMeasurement:
    unitOfMeasurement.Celsius |
    unitOfMeasurement.Fahrenheit |
    unitOfMeasurement.Kelvins
  degrees: number
}

interface IThermometer {
  getTemperature(): Temperature;
}

abstract class Thermometer implements IThermometer {
  protected constructor(protected readonly temperature: Temperature) {}

  getTemperature(): Temperature {
    return this.temperature;
  }
}

class KelvinsThermometer extends Thermometer {
  constructor(private readonly degrees: number) {
    super({
      unitOfMeasurement: unitOfMeasurement.Kelvins,
      degrees: degrees,
    });
  }

  getTemperature(): Temperature {
    return this.temperature;
  }
}

class CelsiusThermometer extends Thermometer {
  constructor(private readonly degrees: number) {
    super({
      unitOfMeasurement: unitOfMeasurement.Celsius,
      degrees: degrees,
    });
  }

  getTemperature(): Temperature {
    return this.temperature;
  }
}

class FahrenheitThermometer extends Thermometer {
  constructor(private readonly degrees: number) {
    super({
      unitOfMeasurement: unitOfMeasurement.Fahrenheit,
      degrees: degrees,
    });
  }

  getTemperature(): Temperature {
    return this.temperature;
  }
}

class CelsiusToKelvinsAdapter extends KelvinsThermometer {
  constructor(
    private readonly celsiusThermometer: CelsiusThermometer,
  ) {
    super(celsiusThermometer.getTemperature().degrees + 273);
  }
}

class FahrenheitToKelvinsAdapter extends KelvinsThermometer {
  constructor(
    private readonly fahrenheitThermometer: FahrenheitThermometer,
  ) {
    super((fahrenheitThermometer.getTemperature().degrees - 32) * 5 / 9 + 273);
  }
}

class CelsiusToFahrenheitAdapter extends FahrenheitThermometer {
  constructor(
    private readonly celsiusThermometer: CelsiusThermometer,
  ) {
    super((celsiusThermometer.getTemperature().degrees) * 9 / 5 + 32);
  }
}

class FahrenheitToFahrenheitAdapter extends CelsiusThermometer {
  constructor(
    private readonly fahrenheitThermometer: FahrenheitThermometer,
  ) {
    super((fahrenheitThermometer.getTemperature().degrees - 32) * 5 / 9);
  }
}

function main() {
  const kelvins: number = 300;
  const celsius: number = 10;
  const fahrenheit: number = 100;

  const kelvinsThermometer = new KelvinsThermometer(kelvins);
  const celsiusThermometer = new CelsiusThermometer(celsius);
  const fahrenheitThermometer = new FahrenheitThermometer(fahrenheit);

  console.log(`1. из ${celsius} градусов Цельсия в Кельвины`);
  const celsiusToKelvinsAdapter = new CelsiusToKelvinsAdapter(celsiusThermometer);
  console.log(celsiusToKelvinsAdapter.getTemperature());
  console.log(toBe(celsiusToKelvinsAdapter.getTemperature().degrees, 283));

  console.log('\n----------------------------------------------------\n');

  console.log(`2. из ${fahrenheit} градусов Фаренгейта в Кельвины`);
  const fahrenheitToKelvinsAdapter = new FahrenheitToKelvinsAdapter(fahrenheitThermometer);
  console.log(fahrenheitToKelvinsAdapter.getTemperature());
  console.log(toBe(fahrenheitToKelvinsAdapter.getTemperature().degrees, 310.7));

  console.log('\n----------------------------------------------------\n');

  console.log(`3. из ${celsius} градусов Цельсия в Фаренгейты`);
  const celsiusToFahrenheitAdapter = new CelsiusToFahrenheitAdapter(celsiusThermometer);
  console.log(celsiusToFahrenheitAdapter.getTemperature());
  console.log(toBe(celsiusToFahrenheitAdapter.getTemperature().degrees, 50));

  console.log('\n----------------------------------------------------\n');

  console.log(`4. из ${fahrenheit} Фаренгейта в Цельсии`);
  const fahrenheitToFahrenheitAdapter = new FahrenheitToFahrenheitAdapter(fahrenheitThermometer);
  console.log(fahrenheitToFahrenheitAdapter.getTemperature());
  console.log(toBe(fahrenheitToFahrenheitAdapter.getTemperature().degrees, 37.7778));
}

function toBe(num1: any, num2: any): boolean {
  return Math.round(num1) === Math.round(num2);
}

main();
