export const pubsub = {
  events: {},

  subscribe: function(e, fn){
    this.events[e] = this.events[e] || [];
    this.events[e].push(fn)
  },

  unsubscribe: function(e, fn){
    if(this.events[e]){
      this.events[e] = this.events[e].filter((f) => f !== fn);
    }
  },
  
  publish: function(e, data){
    if(this.events[e]){
      this.events[e].forEach((f) => {
        f(data);
      });
    }
  }
};
