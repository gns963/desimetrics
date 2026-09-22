'use client'

import { useMemo, useState } from 'react'
import {
  calculateGratuityV2,
  type GratuityEmployeeType,
  type GratuityEmployerCoverage,
  type GratuityScenario,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const SCENARIO_TABS: { value: GratuityScenario; label: string }[] = [
  { value: 'retirement', label: 'Retirement / Resignation' },
  { value: 'death', label: 'Death Gratuity' },
  { value: 'fixedTerm', label: 'Fixed-Term (2025)' },
]

const COVERAGE_OPTIONS: { value: GratuityEmployerCoverage; label: string; icon: string }[] = [
  { value: 'covered', label: 'Covered under the Act (divisor 26)', icon: '✅' },
  { value: 'nonCovered', label: 'Not covered (divisor 30)', icon: '➖' },
]

const EMPLOYEE_TYPE_OPTIONS: { value: GratuityEmployeeType; label: string; icon: string }[] = [
  { value: 'private', label: 'Private sector (₹20L ceiling)', icon: '🏢' },
  { value: 'government', label: 'Government (₹25L, fully exempt)', icon: '🏛️' },
]

export default function GratuityCalculatorAdvanced() {
  const [scenario, setScenario] = useState<GratuityScenario>('retirement')
  const [salary, setSalary] = useState(50000)
  const [years, setYears] = useState(10)
  const [coverage, setCoverage] = useState<GratuityEmployerCoverage>('covered')
  const [employeeType, setEmployeeType] = useState<GratuityEmployeeType>('private')

  const result = useMemo(
    () =>
      calculateGratuityV2({
        scenario,
        lastDrawnSalary: Math.max(0, salary),
        yearsOfService: Math.max(0, years),
        employerCoverage: coverage,
        employeeType,
      }),
    [scenario, salary, years, coverage, employeeType],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="💼" title="Gratuity Calculator" subtitle="What you're owed, by scenario" />

      <div className="mb-5 flex gap-1 rounded-lg border border-hairline bg-mist/40 p-1">
        {SCENARIO_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setScenario(tab.value)}
            aria-pressed={scenario === tab.value}
            className={`flex-1 rounded-md px-2 py-2 text-xs font-semibold transition sm:text-sm ${
              scenario === tab.value ? 'bg-white text-ink-navy shadow-sm' : 'text-ash/60 hover:text-ash'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="grat-salary" className="mb-1.5 block text-sm font-medium text-ash">
            Last drawn salary — Basic + DA (₹/month)
          </label>
          <input
            id="grat-salary"
            type="number"
            min={0}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">Basic + DA only — exclude HRA, bonus and other allowances.</p>
        </div>

        <SliderField
          id="grat-years"
          label="Years of service"
          value={years}
          onChange={setYears}
          min={0}
          max={40}
          step={0.5}
          unit="yrs"
          hint={
            scenario === 'retirement'
              ? 'Minimum 5 years needed (waived for death or the fixed-term rule).'
              : scenario === 'fixedTerm'
                ? 'Minimum 1 year needed under the 2025 fixed-term rule.'
                : 'No minimum — death gratuity is payable from day one.'
          }
        />

        {employeeType === 'private' && (
          <OptionCardGroup legend="Employer coverage" options={COVERAGE_OPTIONS} value={coverage} onChange={setCoverage} columns={2} />
        )}

        <OptionCardGroup legend="Employee type" options={EMPLOYEE_TYPE_OPTIONS} value={employeeType} onChange={setEmployeeType} columns={2} />

        <CalculatorCta label="Calculate Gratuity" tone="financial" disclaimer="Results are approximate estimates. Your actual entitlement may vary." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-3">
          <p className="text-sm text-ash/60">Gratuity payable</p>
          <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
            {formatINR(result.gratuity)}
          </p>
          {result.eligible ? (
            <p className="text-sm text-ash/60">
              Based on {result.roundedYears} {result.roundedYears === 1 ? 'year' : 'years'} of service
              {scenario === 'death' && employeeType === 'government'
                ? ' (CCS death-gratuity slab table).'
                : ` (15/${coverage === 'covered' ? '26' : '30'} formula).`}
            </p>
          ) : (
            <p className="rounded-lg bg-brass/10 px-3 py-2 text-sm text-brass">{result.ineligibilityReason}</p>
          )}
          {result.capped && (
            <p className="text-xs text-brass">Capped at the statutory ceiling of {formatINR(result.ceilingApplied)}.</p>
          )}
          {result.eligible && (
            <p className={`text-xs ${result.isFullyTaxExempt ? 'text-spark-teal' : 'text-ash/50'}`}>
              {result.isFullyTaxExempt
                ? 'Fully tax-exempt under Section 10(10)(i) — government employee.'
                : `Tax-exempt up to ${formatINR(result.ceilingApplied)} under Section 10(10); this amount is within that limit.`}
            </p>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
