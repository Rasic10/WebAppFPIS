using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class DbInitialize
    {
        public static void Initialize(MlekaraSaruljaContext context)
        {
            context.Database.EnsureCreated();

            context.SaveChanges();
        }
    }
}
