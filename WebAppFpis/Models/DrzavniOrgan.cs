using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class DrzavniOrgan
    {
        [Key]
        public int SifraOrganaID { get; set; }
        public string NazivOrgana { get; set; }
        public Mesto Adresa { get; set; }
    }
}
