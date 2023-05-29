import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.scss'],
})
export class CalculatePageComponent implements OnInit {
  calculatorForm: FormGroup;
  currencies: string[] = [
    'TUSD (Test US Dollar)',
    'TEUR (Test Euro)',
    'TCNY (Test Chinese Yuan)',
    'TINR (Test Indian Rupee)',
    'TBRL (Test Brazilian Real)',
    'TIDR (Test Indonesian Rupiah)'
  ];
  periods: number[] = [1, 3, 6, 12, 24];
  aprs: { [key: string]: number } = {
    'TUSD (Test US Dollar)': 0.12,
    'TEUR (Test Euro)':0.13,
    'TCNY (Test Chinese Yuan)':0.2,
    'TINR (Test Indian Rupee)': 0.33,
    'TBRL (Test Brazilian Real)': 0.21,
    'TIDR (Test Indonesian Rupiah)': 0.8,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calculatorForm = this.fb.group({
      amount: [
        1000,
        [Validators.required, Validators.min(1000), Validators.max(1000000)],
      ],
      currency: ['TUSD (Test US Dollar)', Validators.required],
      period: [1, Validators.required],
    });

    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculateProfit();
    });
  }

  decreaseAmount() {
    const currentAmount = this.calculatorForm.get('amount')?.value;
    if (currentAmount > 1000) {
      this.calculatorForm.get('amount')?.setValue(currentAmount - 1000);
    }
  }

  increaseAmount() {
    const currentAmount = this.calculatorForm.get('amount')?.value;
    if (currentAmount < 1000000) {
      this.calculatorForm.get('amount')?.setValue(currentAmount + 1000);
    }
  }

  calculateProfit(): number {
    const amount = this.calculatorForm.get('amount')?.value;
    const currency = this.calculatorForm.get('currency')?.value;
    const period = this.calculatorForm.get('period')?.value;

    if (amount && currency && period) {
      const apr = this.aprs[currency];
      const profit = amount * (apr / 12) * period;
      return +profit.toFixed(2);
    }

    return 0;
  }
}
