using AngularC_.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Table.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Table.Controllers
{
  [EnableCors("AllowAngularApp")]
  [Route("api/colors")]
  [ApiController]
  public class ColorController : ControllerBase
  {
    private readonly DataContext _context;

    public ColorController(DataContext context)
    {
      _context = context;
    }

    // GET: api/colors
    [HttpGet]
    public async Task<IActionResult> GetColors()
    {
      var colors = await _context.Colors.ToListAsync();
      return Ok(colors);
    }

    // POST: api/colors/create
    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertColor([FromBody] Color color)
    {
      if (color == null)
      {
        return BadRequest(new { message = "Invalid color data" });
      }

      if (color.Id == 0) // Adding a new color
      {
        await _context.Colors.AddAsync(color);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Color creation successful" });
      }
      else // Updating an existing color
      {
        var existingColor = await _context.Colors.FindAsync(color.Id);
        if (existingColor == null)
        {
          return NotFound(new { message = "Color not found" });
        }

        existingColor.Name = color.Name;
        existingColor.HexCode = color.HexCode;
        // ... update other properties as needed

        _context.Colors.Update(existingColor);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Color updated successfully" });
      }
    }

    // GET: api/colors/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetColor(int id)
    {
      var color = await _context.Colors.FindAsync(id);
      if (color == null)
      {
        return NotFound(new { message = "Color not found" });
      }
      return Ok(color);
    }

    // DELETE: api/colors/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteColor(int id)
    {
      var color = await _context.Colors.FindAsync(id);
      if (color == null)
      {
        return NotFound(new { message = "Color not found" });
      }

      _context.Colors.Remove(color);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Color deleted successfully" });
    }
  }
}
