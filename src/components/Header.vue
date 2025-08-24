<template>
    <header class="page-header">
        <div class="header-spacer"></div>
        <h1 class="header-name">Nutrim'Aide</h1>
    </header>
</template>

<style scoped>
/* --------------- GLOBAL STYLE --------------- */

.page-header {
  /* Position */
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  padding: 0 20px;
  height: 60px;

  /* Color */
  border-image: linear-gradient(
      to right,
      #002654 33.33%, 
      #ffff 33.33%,
      #ffff 66.66%, 
      #ed2939 66.66%
  ) 1;
  border-bottom: 5px solid;
  background-color: white;
  color: #002654;
}

/* Line under the French Flag */
.page-header::after {
  /* Position */
  position: absolute;
  bottom: -6px;
  width: 100%;
  left: 0;

  /* Shape */
  content: "";
  height: 1px;

  /* Color */
  background-color: #002654;
}

.header-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

/* --------------- RESPONSIVENESS STYLE --------------- */

@media (max-width: 768px) {
  .page-header {
    padding: 0 10px;
    height: 50px;
  }

  .header-name {
    font-size: 1.2rem;
  }

  .page-header::after {
    height: 2px;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 0 8px;
    height: 45px;
  }

  .header-name {
    font-size: 1rem;
  }

  .page-header::after {
    height: 2px;
  }
}
</style>