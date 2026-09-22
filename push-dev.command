#!/bin/bash
# Dobbeltklikkbar snarvei for aa pushe til dev.
# Merk: grenen heter "dev" med liten d. Det fantes tidligere en "Dev" med
# stor D som var en egen gren med annet innhold — den er borte, og skal
# ikke gjenopprettes.
cd "$(dirname "$0")"
git push origin dev
