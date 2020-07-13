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
    public class StavkaZahtevaZaSubvencijeController : ControllerBase
    {
        private readonly MlekaraSaruljaContext _context;

        public StavkaZahtevaZaSubvencijeController(MlekaraSaruljaContext context)
        {
            _context = context;
        }

        // GET: api/StavkaZahtevaZaSubvencije
        [HttpGet]
        public IEnumerable<StavkaZahtevaZaSubvencije> GetStavkaZahtevaZaSubvencija()
        {
            return _context.StavkaZahtevaZaSubvencija;
        }

        // GET: api/StavkaZahtevaZaSubvencije/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStavkaZahtevaZaSubvencije([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stavkaZahtevaZaSubvencije = await _context.StavkaZahtevaZaSubvencija.FindAsync(id);

            if (stavkaZahtevaZaSubvencije == null)
            {
                return NotFound();
            }

            return Ok(stavkaZahtevaZaSubvencije);
        }

        // PUT: api/StavkaZahtevaZaSubvencije/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStavkaZahtevaZaSubvencije([FromRoute] int id, [FromBody] StavkaZahtevaZaSubvencije stavkaZahtevaZaSubvencije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stavkaZahtevaZaSubvencije.SifraStavkeID)
            {
                return BadRequest();
            }

            _context.Entry(stavkaZahtevaZaSubvencije).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StavkaZahtevaZaSubvencijeExists(id))
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

        // POST: api/StavkaZahtevaZaSubvencije
        [HttpPost]
        public async Task<IActionResult> PostStavkaZahtevaZaSubvencije([FromBody] StavkaZahtevaZaSubvencije stavkaZahtevaZaSubvencije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.StavkaZahtevaZaSubvencija.Add(stavkaZahtevaZaSubvencije);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStavkaZahtevaZaSubvencije", new { id = stavkaZahtevaZaSubvencije.SifraStavkeID }, stavkaZahtevaZaSubvencije);
        }

        // POST: api/StavkaZahtevaZaSubvencije/data
        [HttpPost("data")]
        public async Task<IActionResult> PostDataStavkaZahtevaZaSubvencije([FromBody] StavkaZahtevaZaSubvencije[] stavkaZahtevaZaSubvencije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.StavkaZahtevaZaSubvencija.AddRange(stavkaZahtevaZaSubvencije);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/StavkaZahtevaZaSubvencije/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStavkaZahtevaZaSubvencije([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stavkaZahtevaZaSubvencije = await _context.StavkaZahtevaZaSubvencija.FindAsync(id);
            if (stavkaZahtevaZaSubvencije == null)
            {
                return NotFound();
            }

            _context.StavkaZahtevaZaSubvencija.Remove(stavkaZahtevaZaSubvencije);
            await _context.SaveChangesAsync();

            return Ok(stavkaZahtevaZaSubvencije);
        }

        private bool StavkaZahtevaZaSubvencijeExists(int id)
        {
            return _context.StavkaZahtevaZaSubvencija.Any(e => e.SifraStavkeID == id);
        }
    }
}