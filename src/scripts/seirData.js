// Define the type for your SEIR data rows
import * as math from 'mathjs';
/*
Parameters:
- N: Total population
- recovered: percentage of recovered individuals at start
- beta: Infection rate
- gamma: Recovery rate
- sigma: Progression rate from exposed to infected
- birth_rate: Birth rate of the population
- mortality_rate: Natural mortality rate
- fraction_vaccinated_newborns: Fraction of vaccinated newborns
- infection_mortality_rate: Mortality rate of infected individuals
*/
export function calculateSEIRData(N, fraction_vaccinated_pop, beta, gamma, sigma, birth_rate, mortality_rate, fraction_vaccinated_newborns, infection_mortality_rate,simulation_duration_days) {

    // Initial conditions [S, E, I, R]
    const S = N - 5 - (N-5) * fraction_vaccinated_pop;
    const E = 0;
    const I = 5;
    const R = (N-5)*fraction_vaccinated_pop;
    const V = 0;
    const initial_conditions = [S,E,I,R,V];

    // SEIR model differential equations
    function seirModel(t, y) {
        const [S, E, I, R, V] = y;
        
        const dSdt = birth_rate * N - fraction_vaccinated_newborns * birth_rate * N - (beta * S * I) / N - mortality_rate * S;
        const dEdt = (beta * S * I) / N - (mortality_rate + sigma) * E;
        const dIdt = sigma * E - (mortality_rate + gamma + infection_mortality_rate) * I;
        const dRdt = gamma * I - mortality_rate * R;
        const dVdt = fraction_vaccinated_newborns * birth_rate * N - mortality_rate * V;
        return [dSdt, dEdt, dIdt, dRdt, dVdt];
    }

    // Time span
    const tspan = [0, simulation_duration_days]; // 300 days
    let options={};
    
    // Solve the ODE system
    const solution = math.solveODE(seirModel, tspan, initial_conditions, options);

    // solution.forEach(element => {
    // });
    
    return solution;
}


