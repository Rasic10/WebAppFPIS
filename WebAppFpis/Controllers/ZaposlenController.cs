using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppFpis.Models;

namespace WebAppFpis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZaposlenController : ControllerBase
    {
        private readonly MlekaraSaruljaContext _context;

        public ZaposlenController(MlekaraSaruljaContext context)
        {
            _context = context;
        }

        // GET: api/Zaposlen
        [HttpGet]
        public IEnumerable<Zaposlen> GetZaposleni()
        {
            return _context.Zaposleni;
        }

        // GET: api/Zaposlen/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetZaposlen([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zaposlen = await _context.Zaposleni.FindAsync(id);

            if (zaposlen == null)
            {
                return NotFound();
            }

            return Ok(zaposlen);
        }

        // PUT: api/Zaposlen/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZaposlen([FromRoute] int id, [FromBody] Zaposlen zaposlen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != zaposlen.SifraZaposlenogID)
            {
                return BadRequest();
            }

            _context.Entry(zaposlen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZaposlenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Zaposlen
        [HttpPost]
        public async Task<IActionResult> PostZaposlen([FromBody] Zaposlen zaposlen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Zaposleni.Add(zaposlen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZaposlen", new { id = zaposlen.SifraZaposlenogID }, zaposlen);
        }

        // DELETE: api/Zaposlen/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZaposlen([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zaposlen = await _context.Zaposleni.FindAsync(id);
            if (zaposlen == null)
            {
                return NotFound();
            }

            _context.Zaposleni.Remove(zaposlen);
            await _context.SaveChangesAsync();

            return Ok(zaposlen);
        }

        private bool ZaposlenExists(int id)
        {
            return _context.Zaposleni.Any(e => e.SifraZaposlenogID == id);
        }
    }
}