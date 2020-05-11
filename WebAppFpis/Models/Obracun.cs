using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class Obracun
    {
        public int ObracunID { get; set; }
        public int MlekaraID { get; set; }
        public DateTime DatumObracuna { get; set; }
        public string PeriodOd { get; set; }
        public string PeriodDo { get; set; }

        //podaci o mleku
        public double Litara { get; set; }
        public double Kilograma { get; set; }
        public double MlecneMasti { get; set; }
        public double Proteina { get; set; }
        public double SomatskeCelije { get; set; }
        public double SuvaMaterijaBezMasti { get; set; }

        public Mlekara Mlekara { get; set; }
    }
}
