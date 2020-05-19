using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class Mlekara
    {
        public int MlekaraID { get; set; }
        public int PIB { get; set; }
        public string NazivMlekare { get; set; }
        public int MaticniBroj { get; set; }

        public int MestoID { get; set; }

        public Mesto Mesto { get; set; }
    }
}
