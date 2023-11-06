using AngularC_.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Table.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Table.Controllers
{
  [EnableCors("AllowAngularApp")]
  [Route("api/stores")]
  [ApiController]
  public class StoreController : ControllerBase
  {
    private readonly DataContext _context;

    public StoreController(DataContext context)
    {
      _context = context;
    }

    // This method will handle both creation and update
    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertStore([FromBody] Store store)
    {
      if (store == null)
      {
        return BadRequest(new { message = "Invalid store data" });
      }

      // If the store has an ID, we're assuming it's an update
      if (store.Id != 0)
      {
        var existingStore = await _context.Stores.FindAsync(store.Id);
        if (existingStore == null)
        {
          return NotFound(new { message = "Store not found for update" });
        }
        existingStore.Name = store.Name;
        existingStore.Location = store.Location;
        _context.Stores.Update(existingStore);
      }
      else
      {
        // If the store's ID is 0 or not provided, we're assuming it's a new store
        await _context.Stores.AddAsync(store);
      }

      await _context.SaveChangesAsync();

      return Ok(new { message = "Store upsert successful" });
    }

    [HttpGet]
    public async Task<IActionResult> GetStores()
    {
      var stores = await _context.Stores.ToListAsync();
      return stores.Any() ? Ok(stores) : NotFound(new { message = "No stores found" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStore(int id)
    {
      var store = await _context.Stores.FindAsync(id);
      if (store == null)
      {
        return NotFound(new { message = "Store not found" });
      }

      _context.Stores.Remove(store);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Store deleted successfully" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStore(int id)
    {
      var store = await _context.Stores.FindAsync(id);
      if (store == null)
      {
        return NotFound(new { message = "Store not found" });
      }

      return Ok(store);
    }
  }
}
